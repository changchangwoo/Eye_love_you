import tkinter
from tkinter import *
from tkinter import ttk
import pymysql
import tkinter.messagebox
from ttkthemes import ThemedTk
import webbrowser
import subprocess

window = ThemedTk(theme="plastik")
window.title("아이 러브 유")
file_path = r"C:\Users\changwoo\Desktop\EyeLoveYou\Eye_love_you_Program\test.py"


user_id, password = StringVar(), StringVar()

def check_data():
    input_id = user_id.get()
    input_password = password.get()
    connection = pymysql.connect(host='localhost', user='root', password='1234!', db='eyeloveyoudb', charset='utf8')
    try:
        with connection.cursor() as cursor:
            sql = "SELECT * FROM userprofile WHERE user_id=%s AND password=%s"
            cursor.execute(sql, (input_id, input_password))
            result = cursor.fetchone()
            if result:
                tkinter.messagebox.showinfo("로그인 성공",input_id +"님 환영합니다! 프로그램 실행중입니다")
                arguments = [input_id]
                subprocess.run(["python", file_path] + arguments)
            else:
                tkinter.messagebox.showerror("로그인 실패", "아이디와 비밀번호가 일치하지 않습니다." )

    finally:
        connection.close()

def open_web():
    website_url = "http://localhost:3000/register"
    webbrowser.open(website_url)


title_label = ttk.Label(window, text="아이 러브 유", font=("Arial", 25))
title_label.grid(row=0, column=0, columnspan=2, padx=30, pady=10)
ttk.Label(window, text = "실시간 눈 깜박임 감지 프로그램 prototype",font=("Arial", 10)).grid(row=1, column=0, columnspan=2, padx=30, pady=10)
ttk.Label(window, text = "아이디 ").grid(row = 2, column = 0, padx = 10, pady = 10)
ttk.Label(window, text = "비밀번호 ").grid(row = 3, column = 0, padx = 10, pady = 10)
ttk.Entry(window, textvariable = user_id).grid(row = 2, column = 1, padx = 10, pady = 10)
ttk.Entry(window, textvariable = password).grid(row = 3, column = 1, padx = 10, pady = 10)
ttk.Button(window, text = "로그인", command = check_data).grid(row = 4, column = 0, columnspan=2, padx = 10, pady = 10)
ttk.Button(window, text = "회원가입", command = open_web).grid(row = 5, column = 0, columnspan=2, padx = 10, pady = 10)
ttk.Label(window, text = "동양미래대학교 컴퓨터소프트웨어공학과 아이좋아팀",font=("Arial", 10)).grid(row=6, column=0, columnspan=2, padx=30, pady=10)


window.mainloop()