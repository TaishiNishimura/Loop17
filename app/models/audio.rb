class Audio < ApplicationRecord
  belongs_to :user
  #belongs_to :genre_id
  mount_uploader :audio, AudiofileUploader

  validate :audio_validate

  def audio_validate
    Mp3Info.open(current_path) do |mp3|
      if mp3.length < 17
        errors.add(:audio, "17秒以内のファイルにしてください")
      end
    end
  end

end
