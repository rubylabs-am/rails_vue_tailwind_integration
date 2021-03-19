class AddTodoListToTodoItems < ActiveRecord::Migration[6.1]
  def change
    add_reference :todo_items, :todo_list
  end
end
