class AudiosController < ApplicationController
  def new
    @audio = Audio.new
  end

  def create
    @audio = Audio.new(audio_params)
    @audio.user_id = current_user.id

    unless under_17_seconds?(audio_params[:audio].tempfile)
      redirect_to request.referer
      return
    end

    @audio.save
    redirect_to request.referer
  end

  def update
    @audio = Audio.where(user_id: current_user.id).first

    unless under_17_seconds?(audio_params[:audio].tempfile)
      redirect_to request.referer
      return
    end

    @audio.update(audio_params)
    redirect_to request.referer
  end

  def destroy
    audio = Audio.where(user_id: current_user.id).first
    audio.destroy
    redirect_to request.referer
  end

  def search
    @audios = Audio.where(genre_id: params[:genre_id])
    @users = User.where(id: @audios.pluck('user_id'))
    render "users/index"
  end

  private

  def audio_params
    params.require(:audio).permit(:audio, :title, :genre_id)
  end

  def under_17_seconds?(file_path)
      if Mp3Info.open(file_path).length.floor < 18
        true
      else
        false
      end
  end
end
