#!/bin/python

import socket
import time
from ConfigParser import SafeConfigParser


def main():
        parser = SafeConfigParser()
        parser.read('config.ini')
        ip = parser.get('Datos','ip')
        time_o = parser.get('Datos','timeout')
        puerto = parser.get('Datos','puerto')
        linea_1='HTTP/1.1'
        linea_2='200'
        linea_3='OK'
        try:
                socket_s=socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                socket_s.bind((ip, int(puerto)))
                socket_s.listen(1)
                #socket_s.settimeout(float(time_o))
                #try:
                while True:
                        try:
                                url=['']
                                urlhtml=None
                                socket_c,(ip_c, puerto_c)=socket_s.accept()
                #               socket_c.settimeout(float(time_o))
                                print "conexion establecida"
                                mensaje=socket_c.recv(1024)
                                url=mensaje.split(' ' ,2)
                                print url
                                if url[0] != '':
                                        urlhtml=url[1].split('/',1)
                                else:
                                        socket_c.close()
                                socket_c.send('%s %s %s\n' % (linea_1, linea_2, linea_3))
                                socket_c.send('Content-Type: text/html \n\n')
                                #socket_c.send('charset=utf-8 \n \n')
                                #print "aquii l-"+ urlhtml[1]+ "-l"
                                if urlhtml[1]=='':
                                        dir="/home/dreyes/pega5/www-data/index.html"
                                else:
                                        dir="/home/dreyes/pega5/www-data/"+urlhtml[1]

                #socket_c.send('<html><body><h1>url= %s </h1></html>' % dir)

                                try:
                                        try:
                                                print "intentando cargar pagina"
                                                file=open(dir,"r")
                                                socket_c.send(file.read(1024))
                                                file.close()
                                        except IOError as e:
                                                if e.errno == 13:
                                                        dir='/home/dreyes/pega5/www-error/403.html'
                                                        file=open(dir,"r")
                                                        socket_c.send(file.read(1024))
                                                        file.close()
                                                else:
                                                        if e.errno == 2:
                                                                dir='/home/dreyes/pega5/www-error/404.html'
                                                                file=open(dir,"r")
                                                                socket_c.send(file.read(1024))
                                                                file.close()

                                except:
                                        dir='/home/dreyes/pega5/www-error/404.html'
                                        file=open(dir,"r")
                                        socket_c.send(file.read(1024))
                                        file.close()
                        except:
                                socket_c.close()
                        time.sleep(20)
                        socket_c.close()
        except:
                socket_s.close()
if __name__== '__main__':
        main();
