
from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from adminapp import views

urlpatterns = [
      path('', views.loginpage, name='loginpage'), 
    path('api/', include('apiapp.urls')),
    path('admin/', admin.site.urls),
    path('adminapi/', include('adminapp.urls')),
    
   
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
