json.extract! todo_item, :id, :name, :details, :completed, :todo_list_id, :created_at, :updated_at
json.url todo_list_url(todo_item, format: :json)
