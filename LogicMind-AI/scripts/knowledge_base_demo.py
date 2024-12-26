class KnowledgeBase:
    def __init__(self):
        self.facts = []
        self.rules = []

    def add_fact(self, fact):
        self.facts.append(fact)

    def add_rule(self, rule):
        self.rules.append(rule)

    def query(self, query):
        if query in self.facts:
            return True
        for rule in self.rules:
            if rule.consequent == query:
                if all(self.query(antecedent) for antecedent in rule.antecedents):
                    return True
        return False

class Rule:
    def __init__(self, antecedents, consequent):
        self.antecedents = antecedents
        self.consequent = consequent

# Demo
kb = KnowledgeBase()

# Add facts
kb.add_fact("parent(john, mary)")
kb.add_fact("parent(mary, ann)")

# Add rule
kb.add_rule(Rule(["parent(X, Y)", "parent(Y, Z)"], "grandparent(X, Z)"))

# Query
print(kb.query("parent(john, mary)"))  # True
print(kb.query("grandparent(john, ann)"))  # True
print(kb.query("parent(ann, john)"))  # False

