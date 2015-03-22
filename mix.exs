defmodule Vandross.Mixfile do
  use Mix.Project

  def project do
    [app: :vandross,
     version: "0.0.1",
     elixir: "~> 1.0",
     elixirc_paths: ["lib", "web"],
     compilers: [:phoenix] ++ Mix.compilers,
     deps: deps]
  end

  # Configuration for the OTP application
  #
  # Type `mix help compile.app` for more information
  def application do
    [mod: {Vandross, []},
     applications: [:phoenix, :cowboy, :logger, :bcrypt, :joken, :poison, :vex, :huex]]
  end

  # Specifies your project dependencies
  #
  # Type `mix help deps` for examples and options
  defp deps do
    [ 
      {:phoenix, "~> 0.10.0"},
      {:phoenix_ecto, "~> 0.1"},
      {:postgrex, ">= 0.0.0"},
      {:cowboy, "~> 1.0"},
      {:plug_jwt, "~> 0.5"},
      {:joken, "~> 0.10"},
      {:poison, "~> 1.3"},
      {:bcrypt, github: "opscode/erlang-bcrypt"},
      {:vex, "~> 0.5.0"},
      {:huex, "~> 0.3" }
    ]
  end
end
