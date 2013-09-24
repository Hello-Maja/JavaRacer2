# GET ===================================

get '/' do
  # Look in app/views/index.erb
  erb :index
end

get '/start/:player1/:player2' do
  # DELETE THIS - JUST WANT TO MAKE SURE THAT JS HAS TAKEN OVER
  @player1 = params[:player1]
  @player2 = params[:player2]
  erb :index
end

get '/end' do
  erb :index
end


# POST ==================================

post '/start' do
  @player1= params[:player1]
  @player2= params[:player2]
  @player1 = Player.create(nickname: @player1)
  @player2 = Player.create(nickname: @player2)
  @game = Game.create(start_time: Time.now)
  redirect "/start/#{@player1.id}/#{@player2.id}"
end

post '/end' do
  @game_end = Game.update(end_time: Time.now)
end

  # //Show login screen
  # //After users are logged in create new names database
  # //hide login, 
  # //Label tracks with player names or display these on screen
  # //Show start button
  # //When start button is clicked create new game & save players
  # //Hide start button and display countdown
  # //Start race - log Time.now (save to database)
  # //End race - log Time.now (save to database)
  # //Calculate race duration and save this to database
  # //Create URL (bitly style)
  # //Output Winner name, race duration, URL
