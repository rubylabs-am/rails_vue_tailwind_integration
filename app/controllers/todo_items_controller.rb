class TodoItemsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_todo_list, only: [:index, :create]
  before_action :set_todo_item, only: [:edit, :update, :destroy, :show]

  def index
    @todo_items =  @todo_list.todo_items

    respond_to do |format|
      format.html
      format.json { render json: @todo_items  }
    end
  end

  def create
    @todo_item = @todo_list.todo_items.build todo_item_params
    if @todo_item.save
      render json: { todo_item: @todo_item }
    else
      render json: { success: false }
    end
  end

  def show
  end

  def update
    if @todo_item.update todo_item_params
      render json: { message: 'Todo item successful updated' }
    else
      render json: {  error_msg: 'Something is wrong' }
    end
  end

  def destroy
    @todo_item.destroy
  end

  private

  def set_todo_list
    @todo_list = TodoList.find_by id: params[:todo_list_id]
  end

  def set_todo_item
    @todo_list = set_todo_list
    @todo_item = @todo_list.todo_items.find_by id: params[:id]
  end

  def todo_item_params
    params.require(:todo_item).permit :name, :details
  end
end
