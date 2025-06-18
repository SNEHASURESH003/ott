from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from django.contrib import messages
from apiapp.models import Movie, User
from django.shortcuts import get_object_or_404, redirect
from apiapp.models import WatchHistory, Watchlist

from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt

from django.db.models import Q
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.decorators import login_required




@csrf_exempt
def loginpage(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            if  user.is_superuser:
                login(request, user)
                return redirect('movielist')
            else:
                context = {
                    'error': 'Only admin users are allowed to login.',
                    'email': email,
                }
                return render(request, 'login.html', context)
        else:
            context = {
                'error': 'Invalid email or password',
                'email': email,
            }
            return render(request, 'login.html', context)

    return render(request, 'login.html')




@login_required
def passwordchangepage(request):
    if request.method == 'POST':
        new_password = request.POST.get('new_password')
        request.user.set_password(new_password)
        request.user.save()
        messages.success(request, "Password changed successfully.")
        return redirect('loginpage')
    
    return render(request, 'changepassword.html')




@login_required
def adminmovielist(request):
    movies = Movie.objects.all()
    return render(request, 'movie_list.html', {'movies': movies})




@login_required
def delete_movie(request, pk):
    movie = get_object_or_404(Movie, pk=pk)
    movie.delete()
    return redirect('movielist')


@login_required
def movie_view(request, pk):
    movie = get_object_or_404(Movie, pk=pk)



    return render(request, 'movies/movie_view.html', {'movie': movie})




@login_required
def movie_edit(request, pk):
    movie = Movie.objects.get(pk=pk)
    if request.method == 'POST':
        movie.title = request.POST.get('title')
        movie.description = request.POST.get('description')
       
        if 'video' in request.FILES:
            movie.video = request.FILES['video']
        if 'thumbnail' in request.FILES:
            movie.thumbnail = request.FILES['thumbnail']
        movie.save()
        return redirect('movielist')
    return render(request, 'movies/movie_edit.html', {'movie': movie})



@login_required
def addmovie(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        description = request.POST.get('description')
        video = request.FILES.get('video')
        thumbnail = request.FILES.get('thumbnail')
        Movie.objects.create(title=title, description=description, video=video, thumbnail=thumbnail)
        messages.success(request, "Movie added successfully.")
        return redirect('movielist')
    return render(request, 'movies/addmovie.html')


@login_required
def search_users(request):
    query = request.GET.get('q', '')
    users = User.objects.all()

    if query:
        users = users.filter(email__icontains=query)

    return render(request, 'userlist.html', {
        'users': users,
        'query': query,
    })
    
    
    
    
@login_required
def search_movies(request):
    query = request.GET.get('q', '')
    movies = Movie.objects.all()

    if query:
        movies = movies.filter(title__icontains=query)

    return render(request, 'movie_list.html', {
        'movies': movies,
        'query': query,
    })




@login_required
def userlist(request):
    query = request.GET.get('query')
    if query:
        users = User.objects.filter(username__icontains=query)
    else:
        users = User.objects.all()
    return render(request, 'userlist.html', {'users': users})




@login_required
def toggle_user_status(request, user_id):
    user = get_object_or_404(User, id=user_id)
    user.is_active = not user.is_active
    user.save()
    return redirect('userlist')





@login_required
def user_history(request, user_id):
    user = get_object_or_404(User, id=user_id)


    if request.method == 'POST' and 'toggle_status' in request.POST:
        user.is_active = not user.is_active
        user.save()
        return redirect('user_history', user_id=user_id)

    history = WatchHistory.objects.filter(user_id=user_id)
    print(history)
    return render(request, 'user_history.html', {
        'history': history,
        'user_obj': user  # pass user to show current status on template
    })



@login_required
def report(request):
    movies = Movie.objects.all().order_by('-view_count')
    return render(request, 'report.html', {'movies': movies})



