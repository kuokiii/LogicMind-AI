class ExpertSystem:
    def __init__(self):
        self.knowledge_base = {}
        self.rules = []

    def add_fact(self, fact, value):
        self.knowledge_base[fact] = value

    def add_rule(self, condition, conclusion):
        self.rules.append((condition, conclusion))

    def infer(self):
        changes = True
        while changes:
            changes = False
            for condition, conclusion in self.rules:
                if self.evaluate_condition(condition) and conclusion not in self.knowledge_base:
                    self.knowledge_base[conclusion] = True
                    changes = True
        return self.knowledge_base

    def evaluate_condition(self, condition):
        if isinstance(condition, str):
            return self.knowledge_base.get(condition, False)
        elif isinstance(condition, tuple):
            op, *args = condition
            if op == 'and':
                return all(self.evaluate_condition(arg) for arg in args)
            elif op == 'or':
                return any(self.evaluate_condition(arg) for arg in args)
            elif op == 'not':
                return not self.evaluate_condition(args[0])
        return False

# Demo
expert_system = ExpertSystem()

# Add facts
expert_system.add_fact("has_fur", True)
expert_system.add_fact("says_meow", True)

# Add rules
expert_system.add_rule(("has_fur", "says_meow"), "is_cat")
expert_system.add_rule("is_cat", "is_mammal")
expert_system.add_rule(("is_mammal", "has_fur"), "is_warm_blooded")

# Infer
result = expert_system.infer()
print("Inferred knowledge:")
for fact, value in result.items():
    print(f"{fact}: {value}")

