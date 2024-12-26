import re

def parse_prolog(code):
    facts = []
    rules = []
    lines = code.split('\n')
    for line in lines:
        line = line.strip()
        if line and not line.startswith('%'):
            if ':-' in line:
                head, body = line.split(':-')
                rules.append((head.strip(), [term.strip() for term in body.split(',')]))
            else:
                facts.append(line)
    return facts, rules

# Demo
prolog_code = """
% Family relationships
parent(john, mary).
parent(mary, ann).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
"""

parsed_facts, parsed_rules = parse_prolog(prolog_code)
print("Facts:", parsed_facts)
print("Rules:", parsed_rules)

