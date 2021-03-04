class CreateTodoItems < ActiveRecord::Migration[6.1]
  def change
    create_table :todo_items do |t|
      t.string :name
      t.text :details
      t.boolean :completed, default: false
      t.references :todo_list

      t.timestamps
    end
  end
end
