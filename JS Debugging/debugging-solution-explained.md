# Debugging Solutions Explained

## Activity 1 - Three Errors Fixed

### Error 1: "pi is not defined"

**Problem:** Line 4 uses `pi` (lowercase) but the variable is declared as `PI` (uppercase)

```javascript
area = radius * radius * pi; // ❌ Wrong - 'pi' doesn't exist
area = radius * radius * PI; // ✅ Correct - matches the declaration
```

**Lesson:** JavaScript is case-sensitive. Variable names must match exactly.

### Error 2: "Assignment to constant variable"

**Problem:** Line 2 declares `radius` with `const`, but line 5 tries to change it

```javascript
const radius = 3; // ❌ Wrong - can't reassign const
radius = 4; // This will cause an error!
```

**Fix:**

```javascript
let radius = 3; // ✅ Correct - 'let' allows reassignment
radius = 4; // Now this works!
```

**Lesson:** Use `const` for values that won't change, `let` for values that will.

### Error 3: No visibility into results

**Problem:** Code runs but we can't see if it's working correctly

**Fix:** Add console.log() statements

```javascript
area = radius * radius * PI;
console.log("Area with radius 3:", area);

radius = 4;
area = radius * radius * PI;
console.log("Area with radius 4:", area);
```

**Lesson:** Always log outputs to verify your code is working correctly.

---

## Activity 2 - Function Refactoring (Two Errors)

### Error 1: Missing return statement

**Problem:** Function calculates area but doesn't return it

```javascript
function circleArea(radius) {
  const area = radius * PI; // Calculates but doesn't return
}
area = circleArea(3); // ❌ Returns undefined!
```

**Fix:**

```javascript
function circleArea(radius) {
  const area = radius * radius * PI;
  return area; // ✅ Now the function returns the calculated value
}
area = circleArea(3); // ✅ Now area gets the correct value
```

**Lesson:** Functions must use `return` to send values back to the caller.

### Error 2: Incorrect formula (Logic Error)

**Problem:** Formula is `radius * PI` instead of `radius * radius * PI`

```javascript
const area = radius * PI; // ❌ Wrong formula
const area = radius * radius * PI; // ✅ Correct formula for circle area
```

**Lesson:** The area of a circle is πr², which means radius × radius × PI.

---

## Debugging Techniques Used

### 1. Console Logging

Add `console.log()` statements to see what's happening:

- Check variable values at different points
- Verify function inputs and outputs
- Track program flow

### 2. Browser Debugger

Steps to use:

1. Open Developer Tools (F12 or right-click → Inspect)
2. Go to Sources tab
3. Find your JavaScript file
4. Click on line numbers to set breakpoints (they turn blue)
5. Refresh the page
6. Use controls:
   - **Step Over** (F10): Execute current line, move to next
   - **Step Into** (F11): Enter function calls to see what happens inside
   - **Step Out** (Shift+F11): Exit current function
   - **Continue** (F8): Run until next breakpoint

### 3. Reading Error Messages

- "pi is not defined" → Variable name doesn't exist
- "Assignment to constant variable" → Trying to change a `const`
- "undefined" result → Function not returning a value or wrong logic

---

## Key Takeaways

1. **JavaScript is case-sensitive** - `PI` and `pi` are different variables
2. **Use `const` for constants, `let` for variables** that need to change
3. **Functions need `return` statements** to give back values
4. **Double-check your formulas** - logic errors don't show error messages
5. **Always test and log your results** to verify correctness
6. **Use the debugger** to step through code and see what's really happening
