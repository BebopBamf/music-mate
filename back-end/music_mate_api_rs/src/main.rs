use std::env;
use std::path::Path;

use actix_redis::RedisActor;
use actix_web::{error::JsonPayloadError, middleware::Logger, web, App, HttpServer};
use log::info;
use sqlx::{migrate::Migrator, PgPool};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // load .env for development only
    #[cfg(debug_assertions)]
    dotenv::dotenv().ok();

    env_logger::init();

    // redis actor
    let redis_url = env::var("REDIS_URL").expect("REDIS_URL environment variable is not set");
    let redis_addr = RedisActor::start(redis_url);

    // postgres pool
    let database_url =
        env::var("DATABASE_URL").expect("DATABASE_URL environment variable is not set");
    let db_pool = PgPool::connect(&database_url)
        .await
        .expect("Could not create database pool");

    // postgres database migrations
    let migrations = Migrator::new(Path::new("./migrations")).await.unwrap();
    migrations
        .run(&db_pool)
        .await
        .expect("Could not run database migrations");

    let server_url = "127.0.0.1:8080";
    info!("Starting Server at: {}", server_url);

    HttpServer::new(move || {
        App::new()
            .data(redis_addr.clone())
            .data(db_pool.clone())
            .wrap(Logger::default())
        // todo: add json payload validator
    })
    .bind(server_url)?
    .run()
    .await?;

    Ok(())
}
