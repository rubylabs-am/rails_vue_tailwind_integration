# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

(1...5).each do |i|
  t_l_name = "Todo list#{i}"
  t_l = TodoList.create name: t_l_name
  puts "\n#{t_l_name} successful created"
  (1...7).each do |j|
    t_i_name = "#{t_l_name} item#{j}"
    t_l.todo_items.create name: t_i_name, details: "I am #{t_i_name}"
    puts "#{t_i_name} of #{t_l_name} successful created"
  end
end
