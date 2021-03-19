class TodoItemsController < ApplicationController
  before_action :set_todo_item, only: %i[ show edit update destroy ]
  skip_before_action :verify_authenticity_token

  # GET /todo_items or /todo_items.json
  def index
    todolist = TodoList.find params[:todo_list_id]
    @todo_items = todolist.todo_items
  end

  # GET /todo_items/1 or /todo_items/1.json
  def show
    todolist = TodoList.find params[:todo_list_id]
    @todo_items = todolist.todo_items
  end

  # GET /todo_items/new
  def new
    @todo_item = TodoItem.new
  end

  # GET /todo_items/1/edit
  def edit
  end

  # POST /todo_items or /todo_items.json
  def create
    @todo_item = TodoItem.new(todo_item_params)

      if @todo_item.save
        render json: @todo_item
      else
        render json: { errors: @todo_item.errors }, status: :unprocessable_entity
      end
  end

  # PATCH/PUT /todo_items/1 or /todo_items/1.json
  def update
    if @todo_item.update(todo_item_params)
        render json: @todo_item
      else
        render json: { errors: @todo_item.errors }, status: :unprocessable_entity
      end
  end

  # DELETE /todo_items/1 or /todo_items/1.json
  def destroy
    @todo_item.destroy
    respond_to do |format|
      format.html { redirect_to todo_items_url, notice: "Todo item was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo_item
      @todo_item = TodoItem.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def todo_item_params
      params.require(:todo_item).permit(:name, :details, :completed, :todo_list_id)
    end
end
