defmodule Vandross.HueController do
  use Vandross.Web, :controller

  plug :action

  def bridge(conn, params) do
    info = connect |> Huex.info

    conn
    |> put_status(200)
    |> json(info)
    |> halt
  end

  def lights(conn, params) do
    lights = connect |> Huex.lights

    conn
    |> put_status(200)
    |> json(lights)
    |> halt
  end

  def light_info(conn, params) do
    light_info = connect |> Huex.light_info(params[:id])

    conn
    |> put_status(200)
    |> json(light_info)
    |> halt
  end

  defp connect() do
    Huex.connect(
      Application.get_env(:vandross, :hue_ip), 
      Application.get_env(:vandross, :hue_user)
    )
  end

end