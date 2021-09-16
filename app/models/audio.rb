class Audio < ApplicationRecord

  belongs_to :user

  mount_uploader :audio, AudiofileUploader

  # validate :audio_validate

  # def audio_validate
  #   if time < 17
  #     errors.add(:audio, "17秒以内のファイルにしてください")
  #   end
  # end

end
