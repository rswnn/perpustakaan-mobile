if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/riswanardiansah/.gradle/caches/transforms-3/176199b1ccd52fcc577c18b9a3a5a18e/transformed/jetified-hermes-android-0.71.6-debug/prefab/modules/libhermes/libs/android.x86/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/riswanardiansah/.gradle/caches/transforms-3/176199b1ccd52fcc577c18b9a3a5a18e/transformed/jetified-hermes-android-0.71.6-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

