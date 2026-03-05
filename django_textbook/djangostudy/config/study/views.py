from django.shortcuts import render
from django.http import HttpResponse    # Http 응답을 반환해주는 함수

# Create your views here.

# HelloView로 요청이 오면
def HelloView(request):
    # dict 형태의 data를 만들어줌
    data = {
        'texts': ["python", "django", "study", "template tag"],
    }

    # 템플릿을 render해서 반환
    return render(request, 'study/index.html', data)