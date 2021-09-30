class Audio < ApplicationRecord
  belongs_to :user

  mount_uploader :audio, AudiofileUploader

  validates :audio, presence: true
  validates :title, presence: true
  validates :genre_id, presence: true
end
