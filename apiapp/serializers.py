from rest_framework import serializers
from .models import Movie
from .models import Watchlist
from .models import WatchHistory



class MovieSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Movie
        fields = ['id', 'title', 'description', 'video', 'thumbnail', 'view_count']
        
        

class WatchlistSerializer(serializers.ModelSerializer):
    movie_id = serializers.IntegerField(source='movie.id')
    title = serializers.CharField(source='movie.title')
    thumbnail = serializers.ImageField(source='movie.thumbnail')

    class Meta:
        model = Watchlist
        fields = ['id', 'movie_id', 'title', 'thumbnail']
       

class WatchHistorySerializer(serializers.ModelSerializer):
    movie_id = serializers.IntegerField(source='movie.id', read_only=True)
    title = serializers.CharField(source='movie.title', read_only=True)
    thumbnail = serializers.ImageField(source='movie.thumbnail', read_only=True)
    watched_at = serializers.DateTimeField(read_only=True)

    class Meta:
        model = WatchHistory
        fields = ['movie_id', 'title', 'thumbnail', 'watched_at']

    
