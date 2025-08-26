# D5 Extension Example: Modal Dev Clipboard

A **clean, working example** of a custom modal in Divi 5 Visual Builder that demonstrates best practices for third-party developers.

## 🎯 **What This Example Demonstrates**

### ✅ **Modal Architecture**
- **WrapperContainer** setup with drag, resize, expand, and snap capabilities
- **Header** component with internationalized title
- **BodyContainer** and **PanelContainer** structure
- **ErrorBoundary** integration for crash prevention

### ✅ **Redux Store Integration**
- **withSelect HOC** pattern for connecting to Divi stores
- **Accessing clipboard data** from `divi/clipboard` store
- **Props mapping** from Redux state to component

### ✅ **Error Handling & UX**
- **Empty state handling** with helpful user guidance
- **Conditional rendering** patterns
- **Professional styling** and layout
- **Scrollable content** for large datasets

### ✅ **Build & Development**
- **Modern Sass compilation** without deprecation warnings
- **Clean webpack configuration**
- **Proper externals** for Divi dependencies
- **Optimized bundle size**

## 🚀 **Quick Start**

### Installation
1. **Download/Clone** this plugin to your WordPress plugins directory
2. **Install dependencies**: `npm install`
3. **Build the plugin**: `npm run build`
4. **Activate** in WordPress Admin → Plugins

### Testing the Modal
1. **Open Divi Visual Builder** on any page
2. **Look for "Clipboard" button** in the builder toolbar
3. **Click to open** the modal

#### With Empty Clipboard:
- Modal shows helpful guidance on how to populate clipboard
- Clean, professional empty state design

#### With Clipboard Data:
1. **Right-click any module** → "Copy" or "Copy Styles"
2. **Open clipboard modal** to see the copied data
3. **Inspect the structure** of clipboard objects

## 🏗️ **Architecture Guide**

### File Structure
```
src/
├── modal/
│   ├── component.jsx     # Main modal component
│   ├── container.jsx     # Redux connection (withSelect)
│   └── style.scss        # Modal-specific styles
├── index.jsx             # Plugin entry point
└── add-bar-builder-buttons.js  # Toolbar button registration
```

### Key Components

#### 1. **Modal Component** (`component.jsx`)
```jsx
export const DevClipboard = ({ name, clipboardItems }) => (
  <ErrorBoundary>
    <WrapperContainer draggable resizable expandable snappable modalName={name}>
      <Header name={__('Clipboard', 'et_builder')} />
      <BodyContainer>
        <PanelContainer id="clipboard" opened>
          {/* Content with empty state handling */}
        </PanelContainer>
      </BodyContainer>
    </WrapperContainer>
  </ErrorBoundary>
);
```

#### 2. **Redux Container** (`container.jsx`)
```jsx
export default withSelect(selectStore => ({
  clipboardItems: selectStore('divi/clipboard').getItems(),
}))(DevClipboard);
```

#### 3. **Modal Registration** (`index.jsx`)
```jsx
import { addFilter } from '@wordpress/hooks';

addFilter('divi.modalLibrary.modalMapping', 'divi', modals => ({
  ...modals,
  devClipboard: modal,
}));
```

## 🎨 **Customization Examples**

### Adding Your Own Content
Replace the clipboard content with your own data:

```jsx
// In component.jsx
<PanelContainer id="my-panel" opened>
  <div style={{ padding: '20px' }}>
    <h3>My Custom Content</h3>
    <p>Add your own components here...</p>
  </div>
</PanelContainer>
```

### Multiple Panels (Tabs)
```jsx
<WrapperContainer multiPanels modalName={name}>
  <BodyContainer>
    <PanelContainer id="panel1" label="Tab 1" opened>
      {/* First tab content */}
    </PanelContainer>
    <PanelContainer id="panel2" label="Tab 2" opened>
      {/* Second tab content */}
    </PanelContainer>
  </BodyContainer>
</WrapperContainer>
```

### Connecting to Custom Redux Store
```jsx
// Create your own store and connect it
export default withSelect(selectStore => ({
  myData: selectStore('my-plugin/data').getItems(),
}))(MyModalComponent);
```

## 🔧 **Development Guidelines**

### Best Practices
1. **Always use ErrorBoundary** to prevent modal crashes
2. **Handle empty states gracefully** with helpful messaging
3. **Use internationalization** (`__()`) for all user-facing text
4. **Provide helpful comments** for complex logic
5. **Test with empty data** before testing with real data

### Common Patterns
- **Single Panel**: Use `opened` prop, no `multiPanels`
- **Multiple Panels**: Use `multiPanels` with `label` props
- **Conditional Content**: Use `isEmpty()` checks for graceful fallbacks
- **Scrollable Content**: Add `overflow: 'auto'` for long content

### Build Process
```bash
# Development
npm run build

# Production (minified)
NODE_ENV=production npm run build
```

## 🐛 **Troubleshooting**

### Modal Doesn't Appear
- Check that plugin is activated
- Verify build completed successfully
- Check browser console for JavaScript errors

### Build Warnings
- Ensure `sass-loader` has `api: 'modern'` option
- Update browserslist data: `npx update-browserslist-db@latest`

### Empty Modal
- Check Redux store connection in `container.jsx`
- Verify `withSelect` is properly configured
- Check that `modalName` prop is passed correctly

## 📚 **Related Documentation**

- **Divi 5 Modal Components**: [Internal docs reference]
- **Redux Store Architecture**: [Gutenberg Redux patterns]
- **WordPress Hooks API**: [WordPress Developer Handbook]

## 🎯 **Next Steps**

This example provides a **solid foundation**. For more advanced features:

1. **Field Persistence**: See issue #45416 for field components and custom stores
2. **GroupContainer**: Check enhanced examples for expand/collapse patterns  
3. **Complex Redux**: Explore builder settings modal for advanced store patterns

---

**Issue**: #45415 - Fix clipboard modal navigation and build issues  
**Status**: ✅ Fixed - Clean, documented, working example  
**Next**: #45416 - Enhanced field persistence examples