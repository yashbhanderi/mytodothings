from django.http.response import HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from .models import User
from rest_framework.response import Response

# Create your views here.
def home(request):
    return HttpResponse("Home")

