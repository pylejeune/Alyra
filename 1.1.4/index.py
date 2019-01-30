#! /usr/bin/env python3

import math

class Cercle:
    rayon = 0

    def __init__(self, rayon):
        self.rayon = int(math.fabs(rayon))

    def getAire(self):
        result = 0
        result = math.pi * math.pow(self.rayon, 2)
        print("Aire :",math.floor(result))

    def getPerimetre(self):
        result = 0
        result = math.floor(2 * math.pi * self.rayon)
        print("Périmètre :",result)

    def getRayon(self):
        print("Rayon :", self.rayon)

myCircle = Cercle(10)

myCircle.getRayon()
myCircle.getAire()
myCircle.getPerimetre()
