use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :vandross, Vandross.Endpoint,
  http: [port: 4001],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :vandross, Vandross.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "vandross_test",
  size: 1,
  max_overflow: false

config :vandross,
  key: "secret",
  token_expires: 3000,
  password_work_factor: 4,
  hue_ip: "192.168.11.4",
  hue_user: "vandrossserver"
