from django.urls import path
from .import views
from django.contrib.auth.views import LogoutView
from django.contrib.auth.decorators import login_required, user_passes_test





urlpatterns = [
     path('',views.loginpage,name='loginpage'),
    path('changepass',views.passwordchangepage,name='password'),
    path('adminmovielist/',views.adminmovielist,name='movielist'),
    path ('admin_view/<int:pk>/', views.movie_view, name='admin_movieview'),
    path('movies/edit/<int:pk>/', views.movie_edit, name='movie_edit'),
    path('movies/add', views.addmovie, name='addmovie'),
    path('movies/search', views.search_movies, name='search_movies'),
      path('users/search/', views.search_users, name='search_users'),
    path('users/', views.userlist, name='userlist'),
    path('users/history/<int:user_id>/', views.user_history, name='user_history'),
    path('report/',views.report,name='report'),
    path('movies/delete/<int:pk>/', views.delete_movie, name='delete_movie'),
    path('users/toggle-status/<int:user_id>/', views.toggle_user_status, name='toggle_user_status'),
    path('logout/', LogoutView.as_view(next_page='loginpage'), name='logout'),
   
   


    
  


]
           