import re

def prolog_to_python(prolog_code):
    facts = []
    rules = []
    
    for line in prolog_code.split('\n'):
        line = line.strip()
        if line and not line.startswith('%'):
            if ':-' in line:
                head, body = line.split(':-')
                head = head.strip()
                body = [term.strip() for term in body.split(',')]
                rules.append((head, body))
            else:
                facts.append(line)

    python_code = []
    python_code.append("class PrologProgram:")
    python_code.append("    def __init__(self):")
    python_code.append("        self.facts = set()")
    python_code.append("        self.rules = []")
    python_code.append("")
    
    for fact in facts:
        python_code.append(f"        self.facts.add('{fact}')")
    
    python_code.append("")
    for head, body in rules:
        python_code.append(f"    def {head.split('(')[0]}(self, *args):")
        python_code.append(f"        query = '{head}'.format(*args)")
        python_code.append("        if query in self.facts:")
        python_code.append("            return True")
        python_code.append(f"        body = {body}")
        python_code.append("        return all(getattr(self, term.split('(')[0])(*re.findall(r'\\w+', term)) for term in body)")
    
    return "\n".join(python_code)

# Demo
prolog_code = """
% Family relationships
parent(john, mary).
parent(mary, ann).
grandparent(X, Z) :- parent(X, Y), parent(Y, Z).
"""

python_code = prolog_to_python(prolog_code)
print(python_code)

