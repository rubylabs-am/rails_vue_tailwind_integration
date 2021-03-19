class CreateTodoItems < ActiveRecord::Migration[6.1]
  def change
    create_table :todo_items do |t|
      t.string :name
      t.string :details
      t.boolean :completed

      t.timestamps
    end
  end
end
