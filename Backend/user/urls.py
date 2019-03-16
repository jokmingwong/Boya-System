from django.conf.urls import url
from . import views

app_name = 'user'
urlpatterns = [
    url(r'^api/get_all_info', views.home, name='home'),
    url(r'^api/submit_form', views.submit_form, name='submit_form'),
    url(r'^api/submit_pic', views.submit_pic, name='submit_pic')
]
