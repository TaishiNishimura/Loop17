# frozen_string_literal: true

require 'rails_helper'

describe 'アソシエーションのテスト' do
  context 'Userモデルとの関係' do
    it '1:1となっている' do
      expect(Audio.reflect_on_association(:user).macro).to eq :belongs_to
    end
  end
end
