use Mix.Config

# In this file, we keep production configuration that
# you likely want to automate and keep it away from
# your version control system.
config :vandross, Vandross.Endpoint,
  secret_key_base: "XRWDibUV0M2ZgZh4XpOC61Vz9bEnu9ogYIgUuqCB6IUR8LOrok1DrA4ELxKQlKgO"

# Configure your database
config :vandross, Vandross.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "postgres",
  password: "postgres",
  database: "vandross_prod"
