defmodule Vandross.HueChannel do
  use Phoenix.Channel
  require Logger

  def join("hue:all", message, socket) do
    case Joken.Token.decode(Application.get_env(:vandross, :key), Vandross.Codec, message["token"]) do
      {:error, error} ->
        Logger.debug(error)
        {:error, :bad_auth, socket}
      {:ok, payload} ->
        reply socket, "join", %{status: "connected"}
        {:ok, socket}   
    end
  end

  def leave(_reason, socket) do
    {:ok, socket}
  end

  def handle_in("hue:lights", _message, socket) do
    Logger.debug "hue:lights #{socket.topic}"
    lights = connect |> Huex.lights

    reply socket, "hue:lights", lights
    {:ok, socket}
  end

  def handle_in("hue:bridge", _message, socket) do
    info = connect |> Huex.info

    reply socket, "hue:bridge", info
    {:ok, socket}
  end

  def handle_in("hue:light:" <> light_id, _message, socket) do
    light_info = connect |> Huex.light_info(light_id)

    reply socket, "hue:light:" <> light_id, light_info
    {:ok, socket}
  end


  def handle_out(event, message, socket) do
    reply socket, event, message
    {:ok, socket}
  end

  defp connect() do
    Huex.connect(
      Application.get_env(:vandross, :hue_ip), 
      Application.get_env(:vandross, :hue_user)
    )
  end

end