class TodoListsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_todo_list, only: [:edit, :update, :destroy]

  def index
    respond_to do |format|
      format.html
      format.json { render json: TodoList.all }
    end
  end

  def new
  end

  def create
    @todo_list = TodoList.new todo_list_params
    if @todo_list.save
      render json: { todo_list: @todo_list }
    else
      render json: { success: false }
    end
  end

  def edit
  end

  def update
  end

  def destroy
    @todo_list.destroy
  end

  private

  def todo_list_params
    params.require(:todo_list).permit :name
  end

  def set_todo_list
    @todo_list = TodoList.find_by id: params[:id]
  end
end
