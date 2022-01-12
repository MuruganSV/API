#!/bin/bash

if [ $# -eq 3 ]
then
    echo "The first fruit is: $1"
    echo "The second fruit is: $2"
    echo "The third fruit is: $3"
else
    echo "Invalid Arguments"
    exit 125
fi