import time

def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def benchmark_function(func, *args):
    start_time = time.time()
    result = func(*args)
    end_time = time.time()
    return result, end_time - start_time

def run_benchmarks():
    print("Logic Programming Performance Benchmarks")
    print("========================================")

    # Factorial benchmark
    for n in [5, 10, 15, 20]:
        result, duration = benchmark_function(factorial, n)
        print(f"Factorial({n}) = {result} (Time: {duration:.6f} seconds)")

    print()

    # Fibonacci benchmark
    for n in [10, 20, 30, 35]:
        result, duration = benchmark_function(fibonacci, n)
        print(f"Fibonacci({n}) = {result} (Time: {duration:.6f} seconds)")

if __name__ == "__main__":
    run_benchmarks()

