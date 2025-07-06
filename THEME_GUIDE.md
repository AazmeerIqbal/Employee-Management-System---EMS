# Dark/Light Mode Theme System

## 🎨 Overview

Your Employee Management System now features a comprehensive dark/light mode theme system that provides:

- **Automatic Theme Detection**: Follows system preferences
- **Manual Theme Control**: Users can override system settings
- **Persistent Storage**: Theme preference is saved in localStorage
- **Smooth Transitions**: Beautiful animations between themes
- **Comprehensive Coverage**: All components support both themes

## 🚀 Features

### ✅ **Theme Components**

1. **ThemeToggle** (`src/components/ui/theme-toggle.jsx`)

   - Simple toggle button with sun/moon icons
   - Smooth rotation and scale animations
   - Used in navbar and login page

2. **ThemeSelector** (`src/components/ui/theme-selector.jsx`)

   - Advanced dropdown with theme options
   - Light, Dark, and System modes
   - Used in settings page

3. **ThemeProvider** (`src/hooks/useTheme.js`)
   - Manages theme state globally
   - Handles localStorage persistence
   - Provides theme switching functions

### ✅ **Theme Integration**

- **Layout**: Wrapped with ThemeProvider
- **Navbar**: Includes theme toggle
- **Sidebar**: Enhanced with dark mode styling
- **Login Page**: Full dark mode support
- **Settings Page**: Theme management interface
- **All Components**: Use CSS variables for theming

## 🎯 Usage

### **Using the Theme Hook**

```jsx
import { useTheme } from "../hooks/useTheme";

const MyComponent = () => {
  const { theme, toggleTheme, setLightTheme, setDarkTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <button onClick={setLightTheme}>Light Mode</button>
      <button onClick={setDarkTheme}>Dark Mode</button>
    </div>
  );
};
```

### **Adding Theme Toggle to Components**

```jsx
import ThemeToggle from "../ui/theme-toggle";

const MyComponent = () => {
  return (
    <div>
      <ThemeToggle />
      {/* Your component content */}
    </div>
  );
};
```

### **Using Theme Selector**

```jsx
import ThemeSelector from "../ui/theme-selector";

const SettingsPage = () => {
  return (
    <div>
      <h2>Theme Settings</h2>
      <ThemeSelector />
    </div>
  );
};
```

## 🎨 CSS Variables

The theme system uses CSS variables defined in `app/globals.css`:

### **Light Theme Variables**

```css
:root {
  --background: 210 40% 98%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 221 83% 53%;
  --primary-foreground: 210 40% 98%;
  /* ... more variables */
}
```

### **Dark Theme Variables**

```css
.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  /* ... more variables */
}
```

## 🔧 Customization

### **Adding New Theme Colors**

1. **Update CSS Variables**:

   ```css
   :root {
     --my-color: 220 13% 91%;
   }

   .dark {
     --my-color: 220 13% 18%;
   }
   ```

2. **Use in Components**:
   ```jsx
   <div className="bg-[hsl(var(--my-color))]">My themed content</div>
   ```

### **Creating Custom Theme Components**

```jsx
const CustomThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="custom-theme-button">
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};
```

## 📱 Responsive Design

The theme system is fully responsive:

- **Mobile**: Compact theme toggle in navbar
- **Tablet**: Full theme selector in settings
- **Desktop**: Both options available

## 🔄 Theme Transitions

All theme changes include smooth transitions:

```css
.transition-colors {
  transition: color 0.2s ease, background-color 0.2s ease,
    border-color 0.2s ease;
}

.transition-all {
  transition: all 0.2s ease;
}
```

## 🎯 Best Practices

### **Do's**

- ✅ Use CSS variables for all colors
- ✅ Include transition classes for smooth changes
- ✅ Test both themes thoroughly
- ✅ Consider accessibility (contrast ratios)
- ✅ Use semantic color names

### **Don'ts**

- ❌ Don't use hardcoded colors
- ❌ Don't forget to test dark mode
- ❌ Don't ignore accessibility
- ❌ Don't use theme-specific classes

## 🐛 Troubleshooting

### **Theme Not Persisting**

- Check localStorage in browser dev tools
- Verify ThemeProvider is wrapping the app
- Check for JavaScript errors

### **Theme Not Changing**

- Verify CSS variables are defined
- Check if dark class is applied to html element
- Ensure components use CSS variables

### **Styling Issues**

- Use browser dev tools to inspect CSS variables
- Check if components use proper theme classes
- Verify Tailwind CSS is configured correctly

## 🚀 Future Enhancements

Potential improvements for the theme system:

1. **Custom Color Schemes**: User-defined color palettes
2. **Auto Theme**: Time-based theme switching
3. **High Contrast Mode**: Accessibility enhancement
4. **Theme Presets**: Pre-defined theme collections
5. **Animation Controls**: User preference for transitions

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [Dark Mode Best Practices](https://web.dev/prefers-color-scheme/)

---

The theme system is now fully integrated and ready to use! 🎉
