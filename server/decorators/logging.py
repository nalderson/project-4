from app import app
from flask import Flask, jsonify, request
from pprint import pprint

# * This is a simple logger to help us see what requests are happening.

@app.before_request
def log():
    print(f'Request Method: {request.method}')
    print(f'Request URL: {request.url}')
    print(f'Request Body: {request.json}')
    pprint(f'Request Headers: {request.headers}')