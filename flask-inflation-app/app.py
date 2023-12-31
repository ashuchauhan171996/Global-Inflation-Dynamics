from flask import Flask, render_template, request, redirect, jsonify, url_for, session
from flask_migrate import Migrate
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import os
import sys
import sqlite3
from collections import defaultdict
import threading
import pickle
import json
import uuid
import pandas as pd


db = SQLAlchemy()

##########################################################################
################################ MODELS ##################################
##########################################################################

def display_records(table_name):
    try:
        sqliteConnection = sqlite3.connect('instance/stat.db')
        cursor = sqliteConnection.cursor()
        query = f'SELECT * FROM {table_name};'
        # query = "SELECT * FROM " + table_name + " WHERE session_id = '" + session_id + "'"
        sql_display_query = query
        cursor.execute(sql_display_query)
        rows = cursor.fetchall()
        for row in rows:
            print(row)
        # sqliteConnection.commit()
        cursor.close()
    except sqlite3.Error as error:
        print(f'Failed to display records from {table_name} : {error}')

def delete_records(table_name):
    try:
        sqliteConnection = sqlite3.connect('instance/stat.db')
        cursor = sqliteConnection.cursor()
        
        query = f'DROP TABLE IF EXISTS {table_name};'
        # query = "DELETE FROM " + table_name + " WHERE session_id = '" + session_id + "'"
        sql_display_query = query
        cursor.execute(sql_display_query)
        sqliteConnection.commit()
        cursor.close()
        print(table_name, ' records deleted')
    except sqlite3.Error as error:
        print(f'Failed to delete records from {table_name} : {error}')

def return_records(query):
    try:
        sqliteConnection = sqlite3.connect('instance/stat.db')
        cursor = sqliteConnection.cursor()
        # print("Connected to SQLite3")
        cursor.execute(query)
        data = cursor.fetchall()
        cursor.close()
        return data
    except sqlite3.Error as error:
        print(f'SQLite3 error in return records - query {query}: {error}')

def print_schema(table_name):
    try:
        sqliteConnection = sqlite3.connect('instance/stat.db')
        cursor = sqliteConnection.cursor()
        # print("Connected to SQLite3")
        cursor.execute(f"PRAGMA table_info({table_name})")
        schema = cursor.fetchall()
        for column in schema:
            print(f"Column: {column[1]} | Type: {column[2]}")
        cursor.close()
        
    except sqlite3.Error as error:
        print("SQLite3 error:", error)


def load_data(df, table_name ):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect('instance/stat.db')
        df.to_sql(table_name, conn, if_exists='replace', index=False)
        conn.commit()
        conn.close()

        return 'Data loaded successfully.'

    except Exception as e:
        return f'Error loading data: {str(e)}'

#######################################################
################## Main Application ###################
#######################################################

def create_app():
    """Construct the core application."""
    app = Flask(__name__)
    # app.config.from_object("config.Config")

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stat.db'
    app.config['ASSETS_ROOT'] = '/static/assets'
    app.secret_key = 'super secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    db.init_app(app)
    with app.app_context():
        # db.drop_all()
        db.create_all()
        return app
    

app = create_app()
Migrate(app, db)



#############################################
################## ROUTES ###################
#############################################


@app.route('/')
def index():
    inflation_file_name = "Inflation.csv"
    para_file_name = "World_Development_Indicators.csv"
    
    infla_data = pd.read_csv(inflation_file_name)
    columns_to_delete = ['IMF Country Code', 'Indicator Type']
    infla_data = infla_data.drop(columns=columns_to_delete, axis=1)
    # infla_data = infla_data.rename(columns={'Country Code':'country_code', 'Country': 'country','Series Name': 'series_name', '2021':'year2021'})
    load_data(infla_data, 'inflation_table')
    
    
    para_data = pd.read_csv(para_file_name)
    # para_data = para_data.rename(columns={'Country Code':'country_code', 'Country Name': 'country','Series Name': 'series_name'})
    load_data(para_data, 'parameter_table')
    
    # display_records('inflation_table')
    # display_records('parameter_table')
    # print_schema('inflation_table')
    
    return 'Hello Ashutosh and Bhavya!!'

@app.route('/country_options', methods=['GET'])
def get_countries_option():
    series_name = "Headline Consumer Price Inflation"
    query = str(f"SELECT DISTINCT country FROM inflation_table WHERE series_name = '{series_name}';")
    countries = return_records(query)
    parameter_options = []
    # print(countries)
    for country in countries:
        dic = {}
        dic['value'] = country[0]
        dic['label'] = country[0]
        parameter_options.append(dic)
    print(parameter_options[0])
    return jsonify(parameter_options)

@app.route('/top_country_options', methods=['GET'])
def get_top_countries_option():
    countries = ['United States', 'China','Japan','Germany','India','United Kingdom','France','Australia','Russian Federation','Spain','Netherlands','Saudi Arabia','Switzerland','Sweden','Belgium','Thailand','Austria','Norway']
    parameter_options = []
    # print(countries)
    for country in countries:
        dic = {}
        dic['value'] = country
        dic['label'] = country
        parameter_options.append(dic)
    print(parameter_options[0])
    return jsonify(parameter_options)

@app.route('/scatter_options', methods=['GET'])
def scatter_option():
    countries = ['United States', 'China','Japan','Germany','India','France']
    parameter_options = []
    # print(countries)
    for country in countries:
        dic = {}
        dic['value'] = country
        dic['label'] = country
        parameter_options.append(dic)
    print(parameter_options[0])
    return jsonify(parameter_options)

@app.route('/get_multiline_data', methods=['POST'])
def get_multiline_data():
    selected_countries = request.json['selectedParameters']
    series_name = "Headline Consumer Price Inflation"
    data = defaultdict(lambda: defaultdict(list))
    years = ""
    for year in range(1970,2023):
        years += ',year' + str(year) + " "
    # print(years)
    for country in selected_countries:
        query = str(f"SELECT country_code, country, series_name {years} FROM inflation_table WHERE country = '{country}' AND series_name = '{series_name}';")
        filtered_data = return_records(query)
        data[country]['country_code'] = filtered_data[0][0]
        data[country]['country'] = filtered_data[0][1]
        data[country]['series_name'] = filtered_data[0][2]
        for year in range(1970,2023):
            i = year - 1970
            data[country]['year' +str(year)] = filtered_data[0][3+i]
        
        # print(data)
    return jsonify(data)

@app.route('/get_boxplot_data', methods=['POST'])
def get_boxplot_data():
    selected_countries = request.json['selectedParameters']
    # print(selected_countries)
    series_name = "Headline Consumer Price Inflation"
    data = defaultdict(list)
    years = ""
    for year in range(1970,2023):
        years += ',year' + str(year) + " "
    # print(years)
    for country in selected_countries:
        query = str(f"SELECT country, series_name {years} FROM inflation_table WHERE country = '{country}' AND series_name = '{series_name}';")
        filtered_data = return_records(query)
        # data[country] = filtered_data[0][0]

        for year in range(1970,2023):
            i = year - 1970
            data[country].append(filtered_data[0][2+i])
        
        print(data)
    return jsonify(data)

@app.route('/get_top5economies_data', methods=['POST'])
def get_top5economies_data():
    selected_countries = ['United States', 'China', 'Japan', 'Germany', 'India']
    series_name = "Headline Consumer Price Inflation"
    data = defaultdict(lambda: defaultdict(list))
    years = ""
    for year in range(2000,2023):
        years += ',year' + str(year) + " "
    # print(years)
    for country in selected_countries:
        query = str(f"SELECT country_code, country, series_name {years} FROM inflation_table WHERE country = '{country}' AND series_name = '{series_name}';")
        filtered_data = return_records(query)
        data[country]['country'] = filtered_data[0][0]
        data[country]['series_name'] = filtered_data[0][1]
        for year in range(2000,2023):
            i = year - 2000
            data[country]['year' +str(year)] = filtered_data[0][2+i]
        
        print(data)
    return jsonify(data)


@app.route('/indicator_options', methods=['GET'])
def get_indicator_options():

    indicators = ['Birth rate, crude (per 1,000 people)','Death rate, crude (per 1,000 people)','Consumer price index (2010 = 100)','GDP (current US$)','GDP per capita (current US$)', 'GDP per capita growth (annual %)','Exports of goods and services (current US$)','Foreign direct investment, net (BoP, current US$)','Foreign direct investment, net inflows (BoP, current US$)','Foreign direct investment, net outflows (BoP, current US$)','Suicide mortality rate (per 100,000 population)','Suicide mortality rate, female (per 100,000 female population)','Suicide mortality rate, male (per 100,000 male population)','Employment in agriculture (% of total employment) (modeled ILO estimate)','Employment in industry (% of total employment) (modeled ILO estimate)','Employment in services (% of total employment) (modeled ILO estimate)']
    parameter_options = []
    for para in indicators:
        dic = {}
        dic['value'] = para
        dic['label'] = para
        parameter_options.append(dic)
    print(parameter_options[0])
    return jsonify(parameter_options)

@app.route('/get_indicator_data', methods=['POST'])
def get_indicator_data():
    
    selected_indicator = request.json['selectedParameters1']
    selected_country = request.json['selectedParameters2']
    series_name = "Headline Consumer Price Inflation"
    
    data = defaultdict(lambda: defaultdict(list))
    years = ""
    for year in range(1970,2023):
        years += ',year' + str(year) + " "
    # print(years)
    
    
    query = str(f"SELECT country, series_name {years} FROM inflation_table WHERE country = '{selected_country[0]}' AND series_name = '{series_name}';")
    filtered_data = return_records(query)
    data['inflation']['country'] = filtered_data[0][0]
    data['inflation']['series_name'] = filtered_data[0][1]
    for year in range(1970,2023):
        i = year - 1970
        data['inflation']['year' +str(year)] = filtered_data[0][2+i]
        
    for indicator in selected_indicator:
        query = str(f"SELECT country, series_name {years} FROM parameter_table WHERE country = '{selected_country[0]}' AND series_name = '{indicator}';")
        filtered_data = return_records(query)
        data[indicator]['country'] = filtered_data[0][0]
        data[indicator]['series_name'] = filtered_data[0][1]
        for year in range(1970,2023):
            i = year - 1970
            data[indicator]['year' +str(year)] = filtered_data[0][2+i]
        
        # print(data)
    return jsonify(data)


@app.route('/get_correlation_data', methods=['POST'])
def get_correlation_data():
    
    selected_indicator = request.json['selectedParameters1']
    selected_country = request.json['selectedParameters2']
    series_name = "Headline Consumer Price Inflation"
    
    data = defaultdict(list)
    years = ""
    for year in range(1970,2023):
        years += ',year' + str(year) + " "
    # print(years)
    
    
    query = str(f"SELECT country, series_name {years} FROM inflation_table WHERE country = '{selected_country[0]}' AND series_name = '{series_name}';")
    filtered_data = return_records(query)
    for year in range(1970,2023):
        i = year - 1970
        data['inflation'].append(filtered_data[0][2+i])
        
    for indicator in selected_indicator:
        query = str(f"SELECT country, series_name {years} FROM parameter_table WHERE country = '{selected_country[0]}' AND series_name = '{indicator}';")
        filtered_data = return_records(query)
        for year in range(1970,2023):
            i = year - 1970
            data[indicator].append(filtered_data[0][2+i])
        
        # print(data)
    return jsonify(data)

@app.route('/get_scatter_data', methods=['POST'])
def get_scatter_data():
    
    selected_country = request.json['selectedParameters']
    data = { 'selected_country': selected_country}
    return jsonify(data)

