@echo off
echo Testing Liquor Store Management System...
echo.

echo Checking for available executables...
set "found_exe="

REM Check for portable exe (if it exists)
if exist "release\Liquor Store Management System 1.0.1 Portable.exe" (
    echo ✓ Portable exe found in release directory
    set "found_exe=release\Liquor Store Management System 1.0.1 Portable.exe"
) else (
    echo ✗ Portable exe not found in release directory
)

REM Check for unpacked exe (main executable)
if exist "release\win-unpacked\win-unpacked\Liquor Store Management System.exe" (
    echo ✓ Unpacked exe found in release directory
    if not defined found_exe set "found_exe=release\win-unpacked\win-unpacked\Liquor Store Management System.exe"
) else (
    echo ✗ Unpacked exe not found in release directory
)

if not defined found_exe (
    echo.
    echo ✗ No executable found! Please run 'npm run build' first.
    goto :end
)

echo.
echo Found executable: %found_exe%
echo.
echo Attempting to run the application...
echo Press any key to continue...
pause > nul
start "" "%found_exe%"

:end
echo.
echo Test completed. Check if any windows opened or if you see error messages.
pause