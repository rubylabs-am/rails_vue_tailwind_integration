class AddDefaultValueToCompleted < ActiveRecord::Migration[6.1]
  def change
    change_column_default :todo_items, :completed, false
  end
end
