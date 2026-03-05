from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .models import *
from bs4 import BeautifulSoup as bs
import sqlite3
import os
import subprocess
from multiprocessing import Pool
from concurrent.futures import ThreadPoolExecutor
import requests
import json
import time

class ClassAPI(generics.GenericAPIView):
    # Jenkins TEST6
    def post(self, request, *args, **kwargs):
        return Response(
            {
                "success": "true",
            }
        )