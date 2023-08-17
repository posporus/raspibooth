#!/usr/bin/env python3

'''
this runs all the tests located in 'tests' and its subdirectories. 
Folders starting with '_' are ignored.
'''

import os
import sys

project_root = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_root)
print(f"Project root: {project_root}")

import unittest

def run_tests():
    start_dir = 'tests'
    pattern = 'test_*.py'
    loader = unittest.defaultTestLoader
    suite = unittest.TestSuite()

    # Recursively discover tests in start_dir and its subdirectories
    for root, dirs, _ in os.walk(start_dir):
        # Exclude directories that start with an underscore
        dirs[:] = [d for d in dirs if not d.startswith('_')]

        discovered_suite = loader.discover(root, pattern=pattern)
        suite.addTest(discovered_suite)

    runner = unittest.TextTestRunner()
    runner.run(suite)

if __name__ == '__main__':
    run_tests()
