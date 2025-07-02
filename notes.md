git remote add killer ../SudokuKillerApp
git fetch killer

# Gộp toàn bộ repo vào thư mục con apps/killer

git read-tree --prefix=apps/killer/ -u killer/develop
git commit -m "Import SudokuKillerApp into apps/killer"

git remote add classic ../sudoku-classic
git fetch classic

git read-tree --prefix=apps/classic/ -u classic/master
git commit -m "Import sudoku-classic into apps/classic"
