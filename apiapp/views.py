from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from apiapp.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt

from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND,HTTP_201_CREATED, HTTP_204_NO_CONTENT
from rest_framework.authtoken.models import Token
from .models import Movie
from .serializers import MovieSerializer
from .models import Watchlist
from .serializers import WatchlistSerializer
from .models import WatchHistory
from .serializers import WatchHistorySerializer
from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from django.http import JsonResponse


@api_view(['POST'])
@permission_classes((AllowAny,))
def Signup(request):
        email  = request.data.get("email")
        password = request.data.get("password")
        name = request.data.get("name")
        if not name or not email or not password:
            return Response({'message':'All fields are required'})
        if User.objects.filter(email=email).exists():
            return  Response({'message':'Email already exist'})
        user = User.objects.create_user(email=email,password=password)
        user.name = name
        user.save()
        return Response({'message':'user created successsfully'} ,status = 200)
    


@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def login(request):
    email = request.data.get("email")
    password = request.data.get("password")
    if email is None or password is None:
        return Response({'error': 'Please provide both email and password'},
                        status=HTTP_400_BAD_REQUEST)
    user = authenticate(email=email, password=password)
    if not user:
        return Response({'error': 'Invalid Credentials'},
                        status=HTTP_404_NOT_FOUND)
    token, _ = Token.objects.get_or_create(user=user)
    return Response({'token': token.key},status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny,])
def movie_list(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    return Response(serializer.data, status=HTTP_200_OK)


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated,])
def watchlist_view(request):
    if request.method == 'POST':
        movie_id = request.data.get('movie_id')
        if not movie_id:
            return Response({'error': 'movie_id is required'}, status=HTTP_400_BAD_REQUEST)

        movie = get_object_or_404(Movie, id=movie_id)
        obj, created = Watchlist.objects.get_or_create(user=request.user, movie=movie)

        if not created:
            return Response({'message': 'Already in watchlist'}, status=HTTP_200_OK)

        return Response({'message': 'Added to watchlist'}, status=HTTP_201_CREATED)

    elif request.method == 'GET':
        watchlist = Watchlist.objects.filter(user=request.user)
        serializer = WatchlistSerializer(watchlist, many=True)
        return Response(serializer.data, status=HTTP_200_OK)

    elif request.method == 'DELETE':
        movie_id = request.data.get('movie_id')
        if not movie_id:
            return Response({'error': 'movie_id is required'}, status=HTTP_400_BAD_REQUEST)

        movie = get_object_or_404(Movie, id=movie_id)
        watch_item = Watchlist.objects.filter(user=request.user, movie=movie).first()

        if watch_item:
            watch_item.delete()
            return Response({'message': 'Removed from watchlist'}, status=HTTP_204_NO_CONTENT)
        else:
            return Response({'message': 'Not in watchlist'}, status=HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated,])
def movieview(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
        serializer = MovieSerializer(movie)
        return JsonResponse(serializer.data, status=HTTP_200_OK)
    except Movie.DoesNotExist:
        return JsonResponse({'error': 'Movie not found'}, status=HTTP_404_NOT_FOUND)
    
    
    


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated,])
def watch_history_view(request):
    if request.method == 'POST':
        movie_id = request.data.get("movie_id")     
        if not movie_id:
            return Response({"error": "movie_id is required"}, status=400)

        movie = get_object_or_404(Movie, id=movie_id)
        
        watch_entry, created = WatchHistory.objects.get_or_create(user=request.user, movie=movie)
        
        # Update watched_at to current time every time the movie is watched (POST called)
        watch_entry.watched_at = now()
        watch_entry.save()
        movie.view_count += 1
        movie.save()
        return Response({"message": "Movie added to watch history"}, status=201 if created else 200)

    elif request.method == 'GET':
        history = WatchHistory.objects.filter(user=request.user).order_by('-watched_at')
        serializer = WatchHistorySerializer(history, many=True)
        return Response(serializer.data)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated,])
def change_password(request):
    user = request.user
    current_password = request.data.get('current_password')
    new_password = request.data.get('new_password')

    if not current_password or not new_password:
        return Response({'error': 'Current and new passwords are required.'}, status=HTTP_400_BAD_REQUEST)

    if not user.check_password(current_password):
        return Response({'error': 'Current password is incorrect.'}, status=HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    return Response({'success': 'Password changed successfully.'}, status=HTTP_200_OK)





