class PagesController < ApplicationController
  def index; end

  def test
    @messages = %w[Testing\ vue\ world Next\ line And\ one\ more\ here]
  end

  def another_test; end

  def todo_list; end
end
