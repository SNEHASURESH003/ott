
from django.urls import path
from apiapp import views


urlpatterns = [
    path('signup/',views.Signup),
     path('login/',views.login),
         path('movies/', views.movie_list),
         
           path('watchlist/', views.watchlist_view),
             path('watchhistory/', views.watch_history_view),
             path('changepassword/', views.change_password),
              path('movieview/<int:pk>/', views.movieview, name='movie_view'),
               
            

            

]
