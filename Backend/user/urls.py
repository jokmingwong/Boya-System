from django.conf.urls import url
from . import views

app_name = 'user'
urlpatterns = [
    url(r'^api/get_all_info', views.home, name='home'),
    url(r'^api/submit_form', views.submit, name='submit'),
]
