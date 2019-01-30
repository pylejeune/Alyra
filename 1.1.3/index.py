#! /usr/bin/env python3

import math

def palindrome(chaine):
    result = True
    i = 0
    n = len(chaine)

    while result and i < math.floor(n/2):
        if chaine[i] != chaine[n-1-i]:
            result = False
        i = i + 1

    print(chaine)
    return result


chaine = input('Entrez un mot ou chaine de caractère : ')

result = palindrome(chaine)
if result:
    print("C'est un palindrome")
else:
    print("Ce n'est pas un palindrome")