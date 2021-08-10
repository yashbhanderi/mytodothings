from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter

#----- Auth -----#
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView

router = DefaultRouter()

router.register('', views.TodoListViewset, basename='todoviewset')

urlpatterns = [

    ######## API #####################################

    path('user/', include(router.urls)),


    #----- Auth -----#
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),


    #----- Auth-Email -----#
    # path('verify-email/',
    #      VerifyEmailView.as_view(), name='rest_verify_email'),
    # path('account-confirm-email/',
    #      VerifyEmailView.as_view(), name='account_email_verification_sent'),
    # re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$',
    #      VerifyEmailView.as_view(), name='account_confirm_email'),
]
